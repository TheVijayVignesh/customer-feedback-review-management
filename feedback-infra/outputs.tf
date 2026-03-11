output "alb_dns_name" {
  value       = aws_lb.main.dns_name
  description = "ALB DNS - use this as your app URL"
}

output "ec2_public_ip" {
  value       = aws_instance.feedback_app.private_ip
  description = "Public IP of EC2 for SSH"
}