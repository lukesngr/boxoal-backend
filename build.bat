docker build -t boxoalbackend .
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 664245221729.dkr.ecr.ap-southeast-2.amazonaws.com
docker tag boxoalbackend 664245221729.dkr.ecr.ap-southeast-2.amazonaws.com/boxoalbackendregistry
docker push 664245221729.dkr.ecr.ap-southeast-2.amazonaws.com/boxoalbackendregistry