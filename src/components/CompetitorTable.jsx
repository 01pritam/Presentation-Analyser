import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const competitors = [
  {
    name: "Virtual Sapiens",
    posture: "Yes",
    audio: "No",
    factChecking: "No",
    slideAnalysis: "No",
    notes:
      "Focuses on nonverbal cues, posture, and confidence in video calls/presentations.",
    link: "https://www.virtualsapiens.co/",
  },
  {
    name: "Trint",
    posture: "No",
    audio: "Yes",
    factChecking: "No",
    slideAnalysis: "No",
    notes:
      "Transcribe and analyze audio; can feed into fact-checking pipelines.",
    link: "https://trint.com/",
  },
  {
    name: "Sonix",
    posture: "No",
    audio: "Yes",
    factChecking: "No",
    slideAnalysis: "No",
    notes:
      "Automated transcription tool converting audio/video to text in over 35 languages.",
    link: "https://sonix.ai/",
  },
  {
    name: "Descript",
    posture: "No",
    audio: "Yes",
    factChecking: "No",
    slideAnalysis: "No",
    notes:
      "Powerful AI editing tools for videos and podcasts; includes transcription features.",
    link: "https://www.descript.com/",
  },
  {
    name: "ScreenApp Video Analyzer",
    posture: "No (but possible with custom pipelines)",
    audio: "Yes (Audio + Video)",
    factChecking: "No",
    slideAnalysis: "Yes",
    notes:
      "Analyzes video/audio for structure, quality, and content, but not posture/confidence.",
    link: "https://screenapp.io/features/video-analyzer",
  },
  {
    name: "Presentations.AI",
    posture: "No",
    audio: "No",
    factChecking: "No",
    slideAnalysis: "Yes",
    notes: "Analyzes slide design, engagement, and brand consistency.",
    link: "https://www.presentations.ai/",
  },
  {
    name: "SlideSpeak",
    posture: "No",
    audio: "No",
    factChecking: "No",
    slideAnalysis: "Yes",
    notes: "Summarizes and extracts Q&A from slides.",
    link: "https://slidespeak.co/",
  },
  {
    name: "Factiverse",
    posture: "No",
    audio: "No",
    factChecking: "Yes",
    slideAnalysis: "No",
    notes:
      "Fact-checking AI model assisting in verifying textual information.",
    link: "https://www.factiverse.ai/",
  },
  {
    name: "ClaimBuster",
    posture: "No",
    audio: "No",
    factChecking: "Yes",
    slideAnalysis: "No",
    notes:
      "Automated live fact-checking tool developed by the University of Texas at Arlington.",
    link: "https://idir.uta.edu/claimbuster/",
  },
  {
    name: "Presentation-Insight AI",
    posture: "✅ Yes",
    audio: "✅ Yes",
    factChecking: "✅ Yes",
    slideAnalysis: "✅ Yes",
    notes: "All-in-one AI tool analyzing posture, audio, slides, and fact-checking for complete presentation improvement.",
    link: "#", // Replace with your real product link
    isHighlight: true,
  },
];

export default function CompetitorTable() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">AI Presentation Tool Comparison</h2>
      <TableContainer component={Paper} className="rounded-xl shadow-lg">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell><strong>Product Name</strong></TableCell>
              <TableCell><strong>Posture/Confidence</strong></TableCell>
              <TableCell><strong>Audio Analysis</strong></TableCell>
              <TableCell><strong>Fact Checking</strong></TableCell>
              <TableCell><strong>Slide/Content Analysis</strong></TableCell>
              <TableCell><strong>Notes</strong></TableCell>
              <TableCell><strong>Official Link</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {competitors.map((tool, index) => (
    <TableRow
      key={index}
      className={`hover:bg-gray-50 ${
        tool.isHighlight ? "bg-green-100 font-semibold text-black" : ""
      }`}
    >
      <TableCell>{tool.name}</TableCell>
      <TableCell>{tool.posture}</TableCell>
      <TableCell>{tool.audio}</TableCell>
      <TableCell>{tool.factChecking}</TableCell>
      <TableCell>{tool.slideAnalysis}</TableCell>
      <TableCell>{tool.notes}</TableCell>
      <TableCell>
        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Visit
        </a>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}