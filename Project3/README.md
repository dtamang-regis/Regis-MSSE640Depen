# Project 3: Performance Testing using JMeter

## Introduction

Performance testing is an important part of software development that evaluates how an application behaves under different levels of load. It helps identify bottlenecks, improve response time, and ensure system reliability.

In this project, I used Apache JMeter to perform performance testing on my own application developed in Project 2. The application includes an API endpoint `/words`, which was used to simulate user requests and analyze system performance.

---

## Part 1: Types of Performance Testing

### 1.1 Load Testing

**Definition:**  
Load testing checks how the system performs under expected user load. It ensures the application can handle a specific number of users without degradation.

**Goal:**
- Validate response time
- Identify bottlenecks under normal conditions
- Ensure system stability

In this test, a moderate number of users send requests to the `/words` endpoint.

#### Graph:
![alt text](../load-test-graph.png)

**Explanation:**  
The number of threads increases gradually over time until it reaches a steady level

---

### 1.2 Endurance Testing (Soak Testing)

**Definition:**  
Endurance testing evaluates system performance over an extended period under a constant load.

**Goal:**
- Detect memory leaks
- Identify performance degradation over time
- Ensure long-term stability.

In this test, users continuously send requests to the `/words` endpoint for a longer duration.

#### Graph:
![alt text](../endurance-test-graph.png)

**Explanation:**  
Threads are ramped up and then held constant for a long duration to observe stability.
---

### 1.3 Stress / Spike Testing

**Definition:**  
Stress testing pushes the system beyond its limits, while spike testing introduces sudden increases in load.

**Goal:**
- Determine system breaking point
- Observe recovery behavior
- Identify failure handling

#### Graph:
![alt text](../stress-test-graph.png)

**Explanation:**  
Threads rapidly increase (spike) and then drop, simulating sudden traffic bursts.
---

## Part 1: JMeter Components

### Thread Group

The Thread Group defines the number of users (threads), ramp-up time, and loop count. It controls how many users access the application and how quickly they are introduced.

#### Screenshot:
![alt text](<../Screenshot 2026-04-05 at 1.12.49 PM.png>)

---

### HTTP Request Sampler

The HTTP Request Sampler is used to send requests to the server. In this project, it was configured to send GET requests to the `/words` endpoint.

#### Screenshot:
![alt text](<../Screenshot 2026-04-05 at 1.13.59 PM.png>)

---

### Config Elements (HTTP Header Manager)

Config Elements allow customization of requests. The HTTP Header Manager is used to add headers such as `Content-Type: application/json`.

#### Screenshot:
![alt text](<../Screenshot 2026-04-05 at 1.15.44 PM.png>)

---

### Listeners

Listeners display the results of the test, including response time, success rate, and throughput. The "View Results Tree" and "Summary Report" listeners were used.

#### Screenshot:
![alt text](<../Screenshot 2026-04-05 at 1.16.56 PM.png>).    => View Results Tree
![alt text](<../Screenshot 2026-04-05 at 1.17.07 PM.png>).    => Summary Results Tree

---

## Application Performance Index (Apdex)

The Application Performance Index (Apdex) is a standard metric used to measure user satisfaction based on response time.

- Satisfied: Fast response time  
- Tolerating: Acceptable delay  
- Frustrated: Slow response  

Apdex helps quantify how well the application meets user expectations.

---

## Part 2: JMeter Testing

### Test 1: Endurance Test

For this test, I created a Thread Group configured to simulate continuous user activity.

- Endpoint tested: `/words`
- Threads: 50
- Ramp-up: 10 seconds
- Loop count: 50

#### Screenshots:

## [Endurance Thread Group]
![alt text](<../Screenshot 2026-04-05 at 1.19.47 PM.png>)

## [Endurance HTTP Request]
![alt text](<../Screenshot 2026-04-05 at 1.20.35 PM.png>)


## [Endurance Results]
![alt text](<../Screenshot 2026-04-05 at 1.21.33 PM.png>)
![alt text](<../Screenshot 2026-04-05 at 1.21.52 PM.png>)

---

### Test 2: Stress Test

In this test, the system was subjected to a high number of users to evaluate performance under extreme conditions.

- Endpoint tested: `/words`
- Threads: 200
- Ramp-up: 5 seconds

#### Screenshots:

## [Stress Thread Group]
![alt text](<../Screenshot 2026-04-05 at 1.23.44 PM.png>)

## [Stress Results]
![alt text](<../Screenshot 2026-04-05 at 1.25.03 PM.png>)

---

## Overall Graph Results

![alt text](<../Screenshot 2026-04-05 at 1.34.41 PM.png>)

The combined graph shows how the system behaves under different workload conditions by appending load, endurance, and stress tests into a single timeline. Performance remains stable during load and endurance phases, indicating consistent handling of expected traffic over time. However, during the stress phase, a sharp increase in threads leads to performance degradation, highlighting the system’s breaking point and recovery behavior.

## Results and Observations

During testing, the application performed well under moderate load. However, under stress conditions, response time increased, and some requests showed delays. This indicates that the system can handle normal traffic efficiently but may require optimization for high traffic scenarios.

---


## Conclusion

This project provided valuable hands-on experience with performance testing using Apache JMeter. Since this was my first time using JMeter, I initially found it challenging to understand its components such as Thread Groups, HTTP Request Samplers, Config Elements, and Listeners. However, after practicing and exploring the tool, I was able to understand how these components work together to simulate user traffic and measure application performance.

While working on the project, I encountered several issues. At the beginning, I faced multiple errors and warnings, including messages related to deprecated plugins and uncaught exceptions in threads. These errors made it difficult to interpret test results and slowed down my progress. Additionally, the JMeter interface did not display properly at first, and I had to change the look and feel setting to "Metal" to ensure the application worked correctly on my system.

To resolve these issues, I took several steps. I ensured that I was using a stable version of JMeter and avoided unnecessary or outdated plugins. I also carefully reviewed my test configurations, such as verifying correct endpoints, ports, and request settings, which helped eliminate many runtime errors. Changing the look and feel to "Metal" improved the UI stability and allowed me to interact with the tool without issues. Over time, debugging these errors helped me better understand how JMeter operates internally.

Overall, this project helped me gain practical knowledge of performance testing and API behavior under load. I also developed problem-solving skills by troubleshooting real-world issues, which will be valuable in future software development and testing tasks.

Using my own API endpoint `/words` made the testing more practical and relevant. In the future, performance can be improved by optimizing backend processing and implementing caching mechanisms.

---

## Recommendations

- Use cloud deployment for realistic testing
- Monitor CPU and memory usage during tests
- Optimize database queries for better performance
