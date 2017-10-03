job "M4_SERVICE_NAME" {
  datacenters = ["dc1"]
  type        = "service"

  update {
    stagger      = "10s"
    max_parallel = 1
  }

  group "web" {
    constraint {
      distinct_hosts = true
    }

    restart {
      attempts = 10
      interval = "5m"
      delay    = "25s"
      mode     = "delay"
    }

    task "M4_SERVICE_NAME" {
      driver = "docker"

      config {
        image = "danielwpz/M4_IMAGE_NAME:M4_VERSION"

        port_map {
          http = M4_PORT
        }

        logging {
          type = "syslog"
        }
      }

      resources {
        cpu    = 500 # 500 MHz
        memory = 256 # 256MB

        network {
          mbits = 10

          port "http" {
            static = M4_PORT
          }
        }
      }

      service {
        name = "M4_SERVICE_NAME"

        port = "http"

        check {
          name     = "alive"
          type     = "http"
          interval = "10s"
          timeout  = "2s"
          path     = "/status/health"
        }
      }
    }
  }
}
