#!/bin/bash
sudo yum -y install httpd
sudo sytenmctl enable httpd
sudo systemctl start httpd