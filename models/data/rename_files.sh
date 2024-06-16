#!/bin/bash

process_data_batch() {
    for category in $1/*; do
        cd "$category"
        i=0
        for file in ./*; do
            echo "Moving $file to $i.jpg"
            mv "$file" "$i.jpg"
            i=$((i+1))
        done
        cd ../..
    done
}

process_data_batch test
process_data_batch train
