#!/bin/bash

process_data_batch() {
    for category in $1/*; do
        cd "$category"
        i=0
        for file in ./*; do
            if [[ $file != "./*" ]]; then
                echo "Moving $file to $i.jpg"
                mv "$file" "$i.jpg"
                i=$((i+1))
            fi
        done
        cd ../..
    done
}

process_data_batch level1
# process_data_batch level2
# process_data_batch level3
