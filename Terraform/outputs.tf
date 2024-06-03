output "backend_ip" {
  value = aws_instance.backend_instance.public_ip
}

output "db_ip" {
  value = aws_instance.db_instance.public_ip
}

output "backend_dns" {
  value = aws_instance.backend_instance.public_dns
}

output "db_dns" {
  value = aws_instance.db_instance.public_dns
}
