output "instance_id" {
  value = aws_instance.this.id
}

output "az" {
  value = aws_instance.this.availability_zone
}