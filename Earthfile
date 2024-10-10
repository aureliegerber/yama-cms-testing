VERSION 0.8 # https://docs.earthly.dev/docs/earthfile#version
FROM python:3

ARG --global build_dir="public"

# Build the site
build:
    ARG yama_env="production"

    FROM debian:stable
    WORKDIR /workdir

    # If your generator writes to a cache dir for incremental build, this saves it between CI runs
    # CACHE .cache_dir

    COPY . .

    ENV YAMA_ENV=$yama_env

    RUN mkdir -p $build_dir
    RUN echo "Run any command you need here!" > $build_dir/index.html
    # add more commands...
    # add more commands...
    # add more commands...
    # add more commands...

    SAVE ARTIFACT $build_dir build_result AS LOCAL $build_dir

################
# Swift upload #
################

# Base environment for Swift
swift-deps:
    FROM python:3
    RUN pip install python-keystoneclient python-swiftclient


# User-Defined Command to run Swift
SWIFT_UPLOAD:
    FUNCTION
    ARG --required file_or_directory

    RUN --secret OS_USERNAME \
        --secret OS_PASSWORD \
        --secret OS_AUTH_URL \
        --secret OS_AUTH_VERSION \
        --secret OS_TENANT_NAME \
        --secret OS_STORAGE_URL \
        --secret OS_CONTAINER_NAME \
        --push \
        -- \
        swift upload --object-threads 5 --skip-identical --object-name "" $OS_CONTAINER_NAME ./$file_or_directory
        # NOTE: swift will send a `HEAD` request for every file! If there are a lot, OpenStack might start throwing `429 Too Many Requests`.
        # --skip-identical compares filesize and Etag (md5 hash). We can get both using `swift list --json`. We might want to implement a
        # custom "bulk upload" that would first list everything, then upload?


SWIFT_DELETE_BUCKET_FILES_NOT_PRESENT_LOCALLY:
    FUNCTION
    ARG --required file_or_directory

    RUN --push \
        --secret OS_USERNAME \
        --secret OS_PASSWORD \
        --secret OS_AUTH_URL \
        --secret OS_AUTH_VERSION \
        --secret OS_TENANT_NAME \
        --secret OS_STORAGE_URL \
        --secret OS_CONTAINER_NAME \
        -- \
        cd $file_or_directory && \
            swift list $OS_CONTAINER_NAME | \
            perl -lne 'print if !-e' | \
            xargs --no-run-if-empty --verbose swift delete --object-threads 1 $OS_CONTAINER_NAME

        # The code above means:
        # - Get the list of files in the bucket
        # - Pipe them to a Perl one-liner to only keep files that don't exist locally. It reads like:
        #   "On every line, trim the line (-ln) and execute this code (-e): 'print $_ if file $_ does not (-e)xist'" (in perl, `$_` holds the current line and is implicit).
        # - Pipe the files-that-do-not-exist-locally list to `swift delete` via `xargs`
        #   NOTE: We use --object-threads 1 so that there is only one request made. Otherwise, swift will
        #   split all of the files into 10 threads (eg. for 50 files, it'll make 10 threads each bulk-deleting 5 files.)


# Run `swift list` on the container
swift-list:
    FROM +swift-deps

    RUN --push \
        --secret OS_USERNAME \
        --secret OS_PASSWORD \
        --secret OS_AUTH_URL \
        --secret OS_AUTH_VERSION \
        --secret OS_TENANT_NAME \
        --secret OS_STORAGE_URL \
        --secret OS_CONTAINER_NAME \
        -- \
        swift list $OS_CONTAINER_NAME


# Copy the site that was built in `+build`, then upload it via Swift and delete files in the container that aren't in the build result.
build-and-upload:
    ARG yama_env="production"

    FROM +swift-deps
    COPY (+build/build_result --YAMA_ENV=$yama_env) ./to-sync

    DO +SWIFT_UPLOAD --file_or_directory=./to-sync
    DO +SWIFT_DELETE_BUCKET_FILES_NOT_PRESENT_LOCALLY --file_or_directory=./to-sync

# Upload a robots.txt file
upload-norobots:
    FROM +swift-deps

    RUN echo 'Disallow: /' >> robots.txt
    DO +SWIFT_UPLOAD --file_or_directory=./robots.txt


deploy-production:
    BUILD +build-and-upload
    # If you want to set YAMA_ENV, use this instead:
    #BUILD +build-and-upload --yama_env="production"

deploy-preview:
    WAIT
        BUILD +build-and-upload
        # If you want to set YAMA_ENV, use this instead:
        #BUILD +build-and-upload --yama_env="preview"
    END

    BUILD +upload-norobots