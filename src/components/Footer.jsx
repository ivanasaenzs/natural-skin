import React from "react";

import { Box, Button, Typography } from "@mui/material";

import { CiLocationOn, CiMail, CiLinkedin } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

import footerBackground from "../assets/pexels-photo-891030.jpeg";

export const Footer = () => {
  return (
    <>
      <Box component="footer">
        <Box
          sx={{
            backgroundImage: `url(${footerBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "40px 20px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography
            component="h4"
            align="center"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              marginBottom: "20px",
              fontSize: { xs: "1rem", md: "1.5rem" },
            }}
          >
            natural skin
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: "14px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginBottom: "15px",
                backgroundColor: "#f58549",
                opacity: "75%",
              }}
            >
              <CiLocationOn size={24} style={{ marginRight: "4px" }} />
              <Typography
                as="p"
                sx={{
                  marginRight: "auto",
                }}
              >
                Av. Example 123
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                marginBottom: "15px",
                backgroundColor: "#f58549",
                opacity: "75%",
              }}
            >
              <CiMail size={24} style={{ marginRight: "4px" }} />
              <Typography as="p" sx={{ marginRight: "auto" }}>
                naturalskincosmetics@example.com
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                backgroundColor: "#f58549",
                opacity: "75%",
              }}
            >
              <BsTelephone size={24} style={{ marginRight: "4px" }} />
              <Typography as="p">+54 123456-7891</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#f58549",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <Typography sx={{ color: "#fff" }}>
            ©️ 2024 Ivana Saenz Samaniego. All rights reserved.
          </Typography>
          <Box sx={{ padding: "10px 0 14px 0" }}>
            <Button
              component="a"
              href="https://www.linkedin.com/in/ivana-saenzsamaniego/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: "#fff",
                border: "1px solid transparent",
                marginRight: "8px",
                "&:hover": {
                  color: "#fff",
                  border: "1px solid #fff",
                },
              }}
            >
              <CiLinkedin size={24} />
            </Button>
            <Button
              component="a"
              href="https://github.com/ivanasaenzs/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: "#fff",
                border: "1px solid transparent",
                marginRight: "8px",
                "&:hover": {
                  color: "#fff",
                  border: "1px solid #fff",
                },
              }}
            >
              <FaGithub size={24} />
            </Button>
            <Button
              href="mailto:ivanasaenzs7@gmail.com"
              sx={{
                backgroundColor: "#fff",
                border: "1px solid transparent",
                "&:hover": {
                  color: "#fff",
                  border: "1px solid #fff",
                },
              }}
            >
              <CiMail size={24} />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
