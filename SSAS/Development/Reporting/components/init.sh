#! /bin/sh


ant -buildfile $REPORTING_ENV/build.xml -DREPORTING_DIR="$REPORTING_DIR" -DREPORTING_ENV="$REPORTING_ENV" clean init.drivers

