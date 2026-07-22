"use client";

// import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Register standard fonts
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3F2y058nIdU91U3d46qj14ka05m5YA.woff2",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3F2y058nIdU91U3d46qj14ka05m5YA.woff2",
      fontWeight: "bold",
    },
  ],
});

// List of certificates with exact credential URLs
const certificates = [
  {
    title: "HTML/CSS",
    url: "https://www.credential.net/d70a2b84-fc78-44fc-9892-962e110192dc#acc.POtQo43M",
  },
  {
    title: "JavaScript",
    url: "https://www.credential.net/817e792c-02ae-4f30-ab6f-f3051a46e5bc#acc.rFlxCQfc",
  },
  {
    title: "Microverse React & Redux",
    url: "https://www.credential.net/91893fac-6d34-4dd2-b7a6-2867c570d5b9#acc.jVgxw9mW",
  },
  {
    title: "Microverse Ruby/Databases",
    url: "https://www.credential.net/b3b31bec-0e28-4cdd-b790-9bf35d9d6fe2#acc.zdmDnPpZ",
  },
  {
    title: "Microverse Ruby on Rails",
    url: "https://www.credential.net/16124970-9305-4a1b-9a43-2d81970ab27e#acc.XBa2msRn",
  },
  {
    title: "Microverse Software Development",
    url: "https://www.credential.net/b7a1f414-4938-43f0-a594-c11bff34e769#acc.MfdZhPbu",
  },
  {
    title: "Responsive Web Design",
    url: "https://www.freecodecamp.org/certification/Tei/responsive-web-design",
  },
];

// PDF StyleSheet
const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#1f2937",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderBottomColor: "#ef4444",
    borderBottomStyle: "solid",
    paddingBottom: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  role: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ef4444",
    marginTop: 2,
  },
  contactInfo: {
    fontSize: 8,
    color: "#4b5563",
    textAlign: "right",
    lineHeight: 1.4,
  },
  link: {
    color: "#ef4444",
    textDecoration: "none",
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    borderBottomStyle: "solid",
    paddingBottom: 3,
    marginTop: 8,
    marginBottom: 6,
  },
  hashtag: {
    color: "#ef4444",
  },
  summaryText: {
    fontSize: 8.5,
    color: "#374151",
    lineHeight: 1.35,
  },
  // Skills Grid
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  skillBox: {
    width: "49%",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    borderStyle: "solid",
    borderRadius: 4,
    padding: 5,
  },
  skillTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
  },
  skillDesc: {
    fontSize: 7.5,
    color: "#4b5563",
  },
  // Experience Block
  jobBlock: {
    marginBottom: 7,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#111827",
  },
  companyName: {
    color: "#ef4444",
  },
  jobDate: {
    fontSize: 7.5,
    color: "#6b7280",
  },
  jobLocation: {
    fontSize: 7.5,
    color: "#6b7280",
    marginBottom: 2,
  },
  bulletItem: {
    flexDirection: "row",
    marginTop: 1.5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 8,
    color: "#ef4444",
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    color: "#374151",
    lineHeight: 1.3,
  },
  // Education Card
  eduCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 7,
    marginBottom: 6,
  },
  certHeader: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 5,
    marginBottom: 3,
  },
  certGridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  certBadge: {
    width: "49%",
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderStyle: "solid",
    borderRadius: 3,
    padding: 3,
  },
  certFullWidth: {
    width: "100%",
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderStyle: "solid",
    borderRadius: 3,
    padding: 3,
  },
  certText: {
    fontSize: 7,
    color: "#991b1b",
    fontWeight: "bold",
  },
  // Discipline Box
  discBox: {
    width: "49%",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    borderStyle: "solid",
    borderRadius: 4,
    padding: 4,
  },
  discTitle: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 1,
  },
  discDesc: {
    fontSize: 7,
    color: "#4b5563",
    lineHeight: 1.2,
  },
  modulesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 4,
  },
  moduleLabel: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#4b5563",
    marginRight: 4,
  },
  moduleTag: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderStyle: "solid",
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginRight: 3,
    marginBottom: 2,
  },
  moduleTagText: {
    fontSize: 6.5,
    color: "#374151",
    fontWeight: "bold",
  },
});

// React-PDF Document Component
export const ResumePDFDocument = () => (
  <Document title='Tonny_Tei_Resume.pdf' author='Tonny Tei'>
    <Page size='A4' style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>Tonny Tei</Text>
          <Text style={styles.role}>Full-Stack Software Engineer</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text>📍 Nairobi, Kenya</Text>
          <Text>
            ✉️{" "}
            <Link style={styles.link} src='mailto:tonnytei4@gmail.com'>
              tonnytei4@gmail.com
            </Link>
          </Text>
          <Text>
            🌐{" "}
            <Link style={styles.link} src='https://github.com/tonnytech'>
              github.com/tonnytech
            </Link>
          </Text>
        </View>
      </View>

      {/* Summary */}
      <View>
        <Text style={styles.sectionTitle}>
          <Text style={styles.hashtag}># </Text>Summary
        </Text>
        <Text style={styles.summaryText}>
          Performance-driven Software Engineer specializing in scalable
          full-stack web applications, mobile applications, REST APIs, and cloud
          deployments. Experienced in building modern softwares and managing
          low-latency custom VPS infrastructure.
        </Text>
      </View>

      {/* Technical Skills */}
      <View>
        <Text style={styles.sectionTitle}>
          <Text style={styles.hashtag}># </Text>Technical Skills
        </Text>
        <View style={styles.gridRow}>
          <View style={styles.skillBox}>
            <Text style={styles.skillTitle}>Languages & Core:</Text>
            <Text style={styles.skillDesc}>
              TypeScript, JavaScript (ES6+), HTML5, CSS3, SQL
            </Text>
          </View>
          <View style={styles.skillBox}>
            <Text style={styles.skillTitle}>Frontend:</Text>
            <Text style={styles.skillDesc}>
              Next.js (App Router), React, Redux, Tailwind CSS
            </Text>
          </View>
        </View>
        <View style={styles.gridRow}>
          <View style={styles.skillBox}>
            <Text style={styles.skillTitle}>Backend & DB:</Text>
            <Text style={styles.skillDesc}>
              Node.js, Express, Prisma ORM, MySQL, MongoDB, PostgreSQL, Ruby,
              Ruby on Rails
            </Text>
          </View>
          <View style={styles.skillBox}>
            <Text style={styles.skillTitle}>DevOps & Cloud:</Text>
            <Text style={styles.skillDesc}>
              Docker, Cloudflare Tunnels, VPS Management, Git/GitHub
            </Text>
          </View>
        </View>
      </View>

      {/* Experience */}
      <View>
        <Text style={styles.sectionTitle}>
          <Text style={styles.hashtag}># </Text>Experience
        </Text>

        {/* Job 1 */}
        <View style={styles.jobBlock}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>
              Part time web developer{" "}
              <Text style={styles.companyName}>@ Shiftech Africa</Text>
            </Text>
            <Text style={styles.jobDate}>Sep 2024 — Present</Text>
          </View>
          <Text style={styles.jobLocation}>Nairobi, Kenya</Text>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Engineered custom web applications using Next.js, Node.js, and
              Prisma ORM.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Optimized server database queries and caching to cut load times by
              30%.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Configured Docker container deployments across unmanaged Cloud VPS
              instances.
            </Text>
          </View>
        </View>

        {/* Job 2 */}
        <View style={styles.jobBlock}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>
              Software Developer{" "}
              <Text style={styles.companyName}>@ Freelance developer</Text>
            </Text>
            <Text style={styles.jobDate}>Jan 2024 — Present</Text>
          </View>
          <Text style={styles.jobLocation}>Remote / Nairobi</Text>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Developed responsive, interactive user interfaces using React and
              Tailwind CSS.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Integrated RESTful APIs and state management routines using Redux
              Toolkit.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Ensured website security of client&apos;s website and kept confidential
              information from leaking.
            </Text>
          </View>
        </View>

        {/* Job 3 */}
        <View style={styles.jobBlock}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>
              Mentoring Developers{" "}
              <Text style={styles.companyName}>@ Microverse</Text>
            </Text>
            <Text style={styles.jobDate}>Jun 2023 — Dec 2023</Text>
          </View>
          <Text style={styles.jobLocation}>Remote / San Francisco (U.S.A)</Text>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Mentored junior developers, providing technical support through
              code reviews.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Advised junior developers on soft skills that would help them stay
              in the program for the period required, nine months.
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>
              Proposed improvements to code organization to improve code quality
              and overall performance.
            </Text>
          </View>
        </View>
      </View>

      {/* Education & Training */}
      <View>
        <Text style={styles.sectionTitle}>
          <Text style={styles.hashtag}># </Text>Education & Training
        </Text>

        {/* Microverse */}
        <View style={styles.eduCard}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>
              Fullstack Website Development{" "}
              <Text style={styles.companyName}>@ Microverse</Text>
            </Text>
            <Text style={styles.jobDate}>
              2022 — 2023 · San Francisco, CA (Remote)
            </Text>
          </View>

          <Text style={[styles.summaryText, { marginVertical: 3 }]}>
            Spent 1300+ hours mastering algorithms, data structures, and
            full-stack development and earned certificates in HTML and CSS,
            JavaScript, React and Redux, Ruby, Ruby on Rails, and full-stack
            development.
          </Text>

          <Text style={styles.certHeader}>
            Verified Program Certificates ({certificates.length}):
          </Text>

          {/* Certificates Grid */}
          <View style={styles.certGridRow}>
            <View style={styles.certBadge}>
              <Link src={certificates[0].url} style={styles.link}>
                <Text style={styles.certText}>01. {certificates[0].title}</Text>
              </Link>
            </View>
            <View style={styles.certBadge}>
              <Link src={certificates[1].url} style={styles.link}>
                <Text style={styles.certText}>02. {certificates[1].title}</Text>
              </Link>
            </View>
          </View>

          <View style={styles.certGridRow}>
            <View style={styles.certBadge}>
              <Link src={certificates[2].url} style={styles.link}>
                <Text style={styles.certText}>03. {certificates[2].title}</Text>
              </Link>
            </View>
            <View style={styles.certBadge}>
              <Link src={certificates[3].url} style={styles.link}>
                <Text style={styles.certText}>04. {certificates[3].title}</Text>
              </Link>
            </View>
          </View>

          <View style={styles.certGridRow}>
            <View style={styles.certBadge}>
              <Link src={certificates[4].url} style={styles.link}>
                <Text style={styles.certText}>05. {certificates[4].title}</Text>
              </Link>
            </View>
            <View style={styles.certBadge}>
              <Link src={certificates[5].url} style={styles.link}>
                <Text style={styles.certText}>06. {certificates[5].title}</Text>
              </Link>
            </View>
          </View>

          <View style={styles.certFullWidth}>
            <Link src={certificates[6].url} style={styles.link}>
              <Text style={styles.certText}>07. {certificates[6].title}</Text>
            </Link>
          </View>
        </View>

        {/* Murang'a University */}
        <View style={styles.eduCard}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>
              B.Sc. in Computer Science{" "}
              <Text style={styles.companyName}>
                @ Murang&apos;a University of Technology
              </Text>
            </Text>
            <Text style={styles.jobDate}>2017 — 2023 · Murang&apos;a, Kenya</Text>
          </View>

          <Text style={[styles.summaryText, { marginVertical: 3 }]}>
            Completed a comprehensive, four-year curriculum focused on
            fundamental computer science theory, systems engineering, and
            scalable software architecture. Applied core engineering principles
            through hands-on lab work, algorithm optimization, and full-stack
            capstone projects.
          </Text>

          <View style={styles.gridRow}>
            <View style={styles.discBox}>
              <Text style={styles.discTitle}>
                <Text style={styles.hashtag}># </Text>Algorithms & Theory
              </Text>
              <Text style={styles.discDesc}>
                Data structures, asymptotic complexity analysis (O(n), O(log
                n)), graph theory, and dynamic programming.
              </Text>
            </View>
            <View style={styles.discBox}>
              <Text style={styles.discTitle}>
                <Text style={styles.hashtag}># </Text>Software Architecture
              </Text>
              <Text style={styles.discDesc}>
                Object-Oriented Programming (OOP), design patterns, SDLC/Agile
                practices, and Git version control.
              </Text>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.discBox}>
              <Text style={styles.discTitle}>
                <Text style={styles.hashtag}># </Text>Systems & Networking
              </Text>
              <Text style={styles.discDesc}>
                OS kernel processes, multithreading, memory allocation, TCP/IP
                stack, and socket interfaces.
              </Text>
            </View>
            <View style={styles.discBox}>
              <Text style={styles.discTitle}>
                <Text style={styles.hashtag}># </Text>Databases & Web Systems
              </Text>
              <Text style={styles.discDesc}>
                Relational DB design (SQL), normalization (3NF), indexing, REST
                APIs, and client-server setups.
              </Text>
            </View>
          </View>

          {/* Module Tags */}
          <View style={styles.modulesContainer}>
            <Text style={styles.moduleLabel}>Modules:</Text>
            {[
              "Discrete Mathematics",
              "Information Security",
              "Software Testing & QA",
              "Distributed Systems",
              "Compiler Design",
            ].map((mod, i) => (
              <View key={i} style={styles.moduleTag}>
                <Text style={styles.moduleTagText}>{mod}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
