#!/bin/sh

aws s3 sync ../../../dist s3://hinabita/ --include "*"
aws s3 sync ../../facebook/data/ s3://hinabita/data/ --include "*.json"

# aws s3 sync ../../../dist s3://hinabita/ --include "*" --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
