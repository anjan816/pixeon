resource "aws_ebs_volume" "this" {
  availability_zone = var.availability_zone
  size              = 85

  tags = {
    Name = "Extra-EBS-pixeon"
  }
}

resource "aws_volume_attachment" "this" {
  device_name = "/dev/sdh"
  volume_id   = aws_ebs_volume.this.id
  instance_id = var.instance_id
}