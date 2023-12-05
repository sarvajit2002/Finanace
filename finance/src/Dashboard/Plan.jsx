import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const pricingPlans = [
  {
    title: "Basic Plan",
    price: "$19/month",
    description: "For individuals and small businesses.",
  },
  {
    title: "Pro Plan",
    price: "$49/month",
    description: "Perfect for medium-sized businesses.",
  },
  {
    title: "Premium Plan",
    price: "$99/month",
    description: "For large enterprises and agencies.",
  },
];

function Plan() {
  return (
    <Container maxWidth="md">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "2rem",
        }}
      >
        {pricingPlans.map((plan, index) => (
          <Card
            key={index}
            style={{
              minWidth: "300px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {plan.title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {plan.price}
              </Typography>
              <Typography variant="body2">{plan.description}</Typography>
              <Button variant="contained" color="primary">
                Select Plan
              </Button>

              {/* Circle with Exclamation mark and hidden details */}
              <div
                style={{
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    width: "30px",
                    height: "30px",
                    background: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "black",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => {
                    const detailsBox = document.getElementById(
                      `details-${index}`
                    );
                    detailsBox.style.display = "block";
                  }}
                  onMouseLeave={() => {
                    const detailsBox = document.getElementById(
                      `details-${index}`
                    );
                    detailsBox.style.display = "none";
                  }}
                >
                  !
                </div>
                <div
                  id={`details-${index}`}
                  style={{
                    position: "absolute",
                    bottom: "40px",
                    right: "0",
                    width: "120px",
                    background: "rgba(0, 0, 0, 0.8)",
                    color: "white",
                    padding: "10px",
                    display: "none",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {plan.description}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default Plan;
