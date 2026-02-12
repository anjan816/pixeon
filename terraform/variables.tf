# variable "ami" {}
# variable "instance_type" {}
# variable "subnet_id" {}
# variable "subnet_ids" {
#   type = list(string)
# }
# variable "vpc_id" {}

variable "ami" {
  type = string
}

variable "instance_type" {
  type = string
}
variable "key_name" {
  type = string
}