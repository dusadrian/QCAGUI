
attach(NULL, name = "RGUI") 
env <- as.environment("RGUI")

bla <- data.frame(A = 1:3, B = factor(c(1:3), levels = 1:3, labels = letters[1:3]))

env$RGUI_dependencies <- function() {
    packages <- c("admisc", "QCA", "jsonlite", "hashr")
    installed <- logical(length(packages))
    for (i in seq(length(packages))) {
        installed[i] <- requireNamespace(packages[i], quietly = TRUE)
        if (installed[i]) {
            library(packages[i], character.only = TRUE)
        }
    }

    toreturn <- list(
        error = ""
    )

    if (sum(installed) < length(packages)) {
        toreturn$error <- paste(
            "Unable to load packages:",
            paste(packages[!installed], collapse = ", ")
        )
    }
    else {
        cat("_dependencies_ok_\n")
    }

    toreturn$variables = c();

    cat(paste(
        jsonlite::toJSON(toreturn), "\n",
        collapse = "", sep = ""
    ))

}

env$RGUI_parseCommand <- function(command) {
    
    toreturn <- list()
    # cat(command, "\n")
    toreturn$evaluate <- admisc::tryCatchWEM(
        eval(
            parse(text = command),
            envir = .GlobalEnv
        ),
        capture = TRUE
    )

    toreturn$evaluate$command <- command

    toreturn$infobjs <- RGUI_infobjs()
    
    
    cat("RGUIstartJSON\n")
    cat(paste(
        jsonlite::toJSON(toreturn), "\n",
        collapse = "", sep = ""
    ))
    cat("RGUIendJSON\n")
    
}

env$RGUI_ChangeLog <- function(x) {
    # TODO: verify if file ChangeLog exists
    changes <- RGUI_replaceTicks(readLines(system.file("ChangeLog", package = x)))
    return(list(changes = changes))
}

env$RGUI_formatted <- FALSE
env$RGUI_hashes <- c()
env$RGUI_result <- c()


env$RGUI_replaceTicks <- function(x) {
    # weird A character sometimes from SPSS encoding a single tick quote
    achar <- rawToChar(as.raw(c(195, 130)))
    # forward and back ticks
    irv <- c(194, 180, 96)
    tick <- unlist(strsplit(rawToChar(as.raw(irv)), split = ""))
    tick <- c(paste0(achar, "'"), paste0(achar, tick), tick)
    x <- gsub(paste(tick, collapse = "|"), "'", x)
    return(x)
}


env$RGUI_infobjs <- function(scrollvh = NULL) {
    objs <- ls(.GlobalEnv)
    misscroll <- missing(scrollvh)
    env <- as.environment("RGUI")

    toreturn <- list(data = NULL, tt = NULL, qmc = NULL)
    if (length(objs) > 0) {
        tobjs <- unlist(lapply(objs, function(x) {
            objx <- .GlobalEnv[[x]]
            hashx <- hashr::hash(objx)
            samex <- FALSE
            if (is.element(x, names(env$RGUI_hashes))) {
                samex <- hashx == env$RGUI_hashes[x]
            }

            if (!samex) {
                env$RGUI_hashes[x] <- hashx
                if (is.data.frame(objx)) {
                    return(1)
                }
                else if (methods::is(objx, "QCA_tt")) {
                    return(2)
                }
                else if (methods::is(objx, "QCA_min")) {
                    return(3)
                }
            }
            
            return(0)
        }))
        
        if (any(tobjs == 1)) {

            toreturn$data <- lapply(objs[tobjs == 1], function(objname) {
            
                x <- .GlobalEnv[[objname]]
                
                return(list(
                    nrows = nrow(x),
                    ncols = ncol(x),
                    rownames = rownames(x),
                    colnames = colnames(x),
                    numerics = as.vector(unlist(lapply(x, admisc::possibleNumeric))),
                    calibrated = as.vector(unlist(lapply(x, function(x) {
                        if (is.numeric(x)) {
                            return(all(na.omit(x) >= 0 & na.omit(x) <= 1))
                        }
                        return(FALSE)
                    }))),
                    binary = as.vector(unlist(lapply(x, function(x) all(is.element(x, 0:1))))),
                    theData = unname(as.list(x))
                ))
                # scrollvh = c(srow, scol, min(visiblerows, nrow(x)), min(visiblecols, ncol(x))) - 1,
                # dataCoords = paste(c(srow, scol, erow, ecol, ncol(x)) - 1, collapse="_")
            })
            names(toreturn$data) <- objs[tobjs == 1]
        }
        
        if (any(tobjs == 2)) {
            toreturn$tt <- lapply(objs[tobjs == 2], function(x) {
                x <- .GlobalEnv[[x]]
                components <- c("indexes", "noflevels", "cases", "options", "colnames", "numerics")
                
                x$indexes <- x$indexes - 1 # to take the indexes in Javascript notation
                
                cnds <- x$options$conditions
                if (x$options$use.letters) {
                    cnds <- LETTERS[seq(length(cnds))]
                }
                
                x$options$outcome <- list(notilde(x$options$outcome))
                
                if (length(x$options$incl.cut) == 1) {
                    x$options$incl.cut <- list(x$options$incl.cut)
                }
                
                if (length(cnds) <= 7) {
                    x$id <- apply(x$tt[, cnds], 1, function(x) {
                        ifelse(any(x == 1), paste(which(x == 1), collapse=""), "0")
                    })
                    components <- c(components, "id", "tt")
                }
                
                x$colnames <- colnames(x$initial.data)
                x$numerics <- as.vector(unlist(lapply(x$initial.data, admisc::possibleNumeric)))
                
                return(x[components])
            })
        }
        
        if (any(tobjs == 3)) {
            toreturn$qmc <- lapply(objs[tobjs == 2], function(x) {
                x <- .GlobalEnv[[x]]
                components <- c("indexes", "noflevels", "cases", "options")
                x <- x$tt
                
                cnds <- x$options$conditions
                
                if (x$options$use.letters) {
                    cnds <- LETTERS[seq(length(cnds))]
                }
                
                if (length(cnds) <= 7) {
                    x$id <- apply(x$tt[, cnds], 1, function(x) {
                        ifelse(any(x == 1), paste(which(x == 1), collapse=""), "0")
                    })
                    components <- c(components, "id", "tt")
                }
                
                x$indexes <- x$indexes - 1 # to take the indexes in Javascript notation
                return(x[components])
            })
        }
    }
    
    return(toreturn)
}


rm(env)
