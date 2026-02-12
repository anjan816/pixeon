########################################
# 1️⃣ Get Default VPC
########################################
data "aws_vpc" "default" {
  default = true
}

########################################
# 2️⃣ Get Default Subnets
########################################
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

########################################
# 3️⃣ Security Group
########################################
module "sg" {
  source = "./modules/security_group"
  vpc_id = data.aws_vpc.default.id
}

########################################
# 4️⃣ EC2
########################################
module "ec2" {
  source            = "./modules/ec2"
  ami               = var.ami
  instance_type     = var.instance_type
  
  #subnet_id         = data.aws_subnets.default.id
  security_group_id = module.sg.sg_id
  key_name          = var.key_name
}

########################################
# 5️⃣ EBS  (ADD HERE)
########################################
module "ebs" {
  source            = "./modules/ebs"
  availability_zone = module.ec2.az
  instance_id       = module.ec2.instance_id
}

########################################
# 6️⃣ Load Balancer
########################################
module "lb" {
  source            = "./modules/loadbalancer"
  subnet_ids        = data.aws_subnets.default.ids
  security_group_id = module.sg.sg_id
  instance_id       = module.ec2.instance_id
  vpc_id            = data.aws_vpc.default.id
}

########################################
# 7️⃣ CloudWatch  (ADD HERE)
########################################
module "cloudwatch" {
  source      = "./modules/cloudwatch"
  instance_id = module.ec2.instance_id
}