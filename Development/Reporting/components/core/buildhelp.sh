#! /bin/sh

ant -f $REPORTING_ENV/scripts/db2build.xml -DREPORTING_DIR="$REPORTING_DIR" -DREPORTING_ENV="$REPORTING_ENV" -projecthelp
