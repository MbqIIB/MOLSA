#! /bin/sh


ant -buildfile ./build.xml -DREPORTING_DIR="$REPORTING_DIR"  -DREPORTING_ENV="$REPORTING_ENV" $@

