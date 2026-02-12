resource "aws_instance" "this" {
  
  ami                    = var.ami
  instance_type          = var.instance_type
  subnet_id              = "subnet-0ea0698683eeed977"
  vpc_security_group_ids = [var.security_group_id]
  key_name = var.key_name
  
  tags = {
    Name = "pixeon-control"
  }
}
########################################
# Elastic IP
########################################
resource "aws_eip" "this" {
  domain = "vpc"

  tags = {
    Name = "Terraform-pixeon"
  }
}

########################################
# Associate EIP
########################################
resource "aws_eip_association" "this" {
  instance_id   = aws_instance.this.id
  allocation_id = aws_eip.this.id
}