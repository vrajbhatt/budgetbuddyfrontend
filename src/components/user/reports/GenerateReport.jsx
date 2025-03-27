// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, MenuItem, Typography, Container } from "@mui/material";
import { saveAs } from "file-saver";

export const GenerateReport = () => {
    const [reportType, setReportType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [format, setFormat] = useState("pdf");
  
    const handleGenerateReport = async () => {
      try {
        const res = await axios.post("http://localhost:3000/reports/generate", {
          reportType,
          startDate,
          endDate,
          format,
        }, { responseType: "blob" });
        
        const fileType = format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const fileExtension = format === "pdf" ? "pdf" : "xlsx";
        const blob = new Blob([res.data], { type: fileType });
        saveAs(blob, `Report_${reportType}_${startDate}_to_${endDate}.${fileExtension}`);
      } catch (error) {
        console.error("Error generating report:", error);
      }
    };
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Generate Report
      </Typography>
      <TextField
        select
        label="Report Type"
        fullWidth
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
        margin="normal"
      >
        {["Income", "Expense", "Budget", "Financial Goal", "Transaction Summary"].map((type) => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Start Date"
        type="date"
        fullWidth
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        label="End Date"
        type="date"
        fullWidth
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        margin="normal"
      />
      <TextField
        select
        label="Export Format"
        fullWidth
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        margin="normal"
      >
        <MenuItem value="pdf">PDF</MenuItem>
        <MenuItem value="excel">Excel</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" fullWidth onClick={handleGenerateReport} style={{ marginTop: "20px" }}>
        Generate Report
      </Button>
    </Container>
  );
};
