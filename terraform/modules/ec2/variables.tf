variable "ami" {
  type = string
}

variable "instance_type" {
  type = string
}

# variable "subnet_id" {
#   type = string
#   default = "subnet-0ea0698683eeed977"
# }

variable "security_group_id" {
  type = string
}
variable "key_name" {
  type = string
}