terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-central-1"
}

# PostgreSQL
resource "aws_instance" "db_instance" {
  ami             = "ami-0f7204385566b32d0"
  instance_type   = "t2.micro"
  subnet_id       = aws_subnet.public_subnet.id
  security_groups = [aws_security_group.allow_db.id]

  tags = {
    Name = "db_instance"
  }

  user_data = <<-EOF
    #!/bin/bash
    sudo yum update -y
    sudo yum install -y docker

    sudo systemctl start docker
    sudo systemctl enable docker

    sudo docker run -d \
      --name baza_systemy_chmurowe \
      -p 5432:5432 \
      -e POSTGRES_DB=db \
      -e POSTGRES_USER=postgre \
      -e POSTGRES_PASSWORD=postgre \
      bezimienna731/postgres:latest
  EOF
}

# Backend
resource "aws_instance" "backend_instance" {
  ami             = "ami-0f7204385566b32d0"
  instance_type   = "t2.micro"
  subnet_id       = aws_subnet.public_subnet.id
  security_groups = [aws_security_group.allow_backend.id]

  tags = {
    Name = "backend_instance"
  }

  depends_on = [aws_instance.db_instance]

  user_data = <<-EOF
    #!/bin/bash
    sudo yum update -y
    sudo yum install -y git
    sudo yum install -y python3
    sudo yum install python3-pip -y
    pip3 install flask
    pip3 install python-dotenv
    pip3 install -U flask-cors
    pip3 install psycopg2-binary


    git clone https://github.com/G3rw4nt/Legopedia
    cd Legopedia
    cd Backend
    echo "DB_HOST=${aws_instance.db_instance.public_dns}" > .env

    python3 -m flask run --host 0.0.0.0
  EOF
}

# Frontend
resource "aws_instance" "frontend_instance" {
  ami             = "ami-0f7204385566b32d0"
  instance_type   = "t2.micro"
  subnet_id       = aws_subnet.public_subnet.id
  security_groups = [aws_security_group.allow_web.id]

  tags = {
    Name = "frontend_instance"
  }

  depends_on = [aws_instance.db_instance, aws_instance.backend_instance]

  user_data = <<-EOF
    #!/bin/bash
    sudo yum update -y
    sudo yum install -y git
    sudo yum install -y node
    sudo yum install -y npm

    git clone https://github.com/G3rw4nt/Legopedia
    cd Legopedia
    cd Frontend

    echo "BACKEND_URL=http://${aws_instance.backend_instance.public_dns}:5000/" > .env

    npm ci
    npm run dev
  EOF
}