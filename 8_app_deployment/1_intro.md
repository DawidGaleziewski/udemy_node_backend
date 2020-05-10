# install heroku cli

# check cli in terminal
heroku -v
heroku login 


# setting up ssh keys

## checking if we have any .ssh kays
ls -a -l ~/.ssh

## generating ssh hey
-t - tyle of protocol used (rsa)
-b - number of bits (4096)
-C - comment or the label fot the kay
ssh-keygen -t rsa -b 4096 -C "dawid.galeziewski.dev@gmail.com"

after running the command we should see id_rsa and id_rsa.pub in ~/.ssh directory
.pub is the only file we should share with 3rd party like git or heroku

## check if ssh agent is running:
eval "$(ssh-agent -s)"

## register  ssh key
ssh-add ~/.ssh/id_rsa (windows only)
ssh-add -K ~/.ssh/id_rsa (max/linux)

