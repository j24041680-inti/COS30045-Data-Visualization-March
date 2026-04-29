# Exercise 3 – Data Story: TV Energy Consumption

## Overview

By using the TV Energy Consumption dataset, I had created an interactive data story using a grid-based web interface (extending what was built in the Exercise 0.2 website). This new design will help guide users through an interactive storytelling example related to energy efficiency in Australia.

## Data Story

### Audience

The target audiences for the visualisation created are to be:

- Household Owners in Australia who are considering how to lower their quarterly utility expenses by purchasing better quality household appliances.

- Creators of Policies: They are interested in how effective GEMS Act labels are and what trends are occurring among consumers.

- Researchers of Electronics: They are researching the efficiency differences in display technologies, including LCD vs. LED vs. OLED.

### Story Overview

The goal of this interactive experience is to turn technical energy data into usable insights for the consumer. The story is broken down into 5 primary research questions and each presented as a separate "Data Card".

When the user selects a card, the site will zoom into a 6-frame storyboard using modal animation, allowing the user to focus on the stages of the narrative, which will follow a consistent architectural flow.

Frame 1 & 2 (Problem/Demonstration): Trying to identify a common consumer problem (e.g. Confusing technology labels).

Frame 3 & 4 (Ideas/Pilot): How the data was analyzed to connect the problem to the consumer's needs.

Frame 5 & 6 (Success/Recommendation): Presenting the visual evidence along with the final tip for making a "Smart Choice".

## About the Data

### Data Source

The dataset was sourced from the National Energy Archives (GEMS database), containing 2026 product specifications for televisions sold in Australia.

### Data Processing

The data that has been processed to make compatible with the web interface is as follows:

Selection: Relevant attributes were selected and given priority for attributes such as Technology Type, Screen Size in inches, Annual kWh, and Star Ratings.

Aggregation: Data has been aggregated to show market level trends by technology and manufacturer.

Visual Generation: A number of visual representations such as Bar Charts and Scatter Plots were created for each storyboard frame to help support the visual storytelling.

### Privacy

Personal Information: There are no personal or sensitive details found in the data. Instead, all of the information is related to the product metrics themselves, which are all publicly available.

Ethics: In order to avoid causing confusion for viewers of our website showcasing Notable Energy-Related Events, the interface distinguishes between relative efficiency (stars) and actual consumption (kWh) to prevent consumer confusion by using an "energy-efficient" television to describe a television with a large screen that would ultimately use a considerable amount of energy to operate.

### Accuracy and Limitations

There are limitations to this dataset and what can be learned from these insights into the Australian television sector.

- The dataset reflects only a representative sample of models available as of 2026 (when tests were conducted). The dataset also might not include all niche or budget brands.

- The dataset considers energy consumption (annual kilowatt-hours) generated through testing under GEMS (Global Energy Management System) conditions, which are standardized for testing purposes.

- User settings will also affect how much power each model actually uses (i.e., brightness (HDR), volume, and number of hours the player is in use each day).

### Ethics

Ethical Data Representation is fundamental within this project, as shown by my responses to three points below:

1. The Efficiency Paradox: Providing clear differentiation of ‘Stars’ (efficiency restraints based on physical dimensions of product) versus ‘kWh’ – (actual cost of usage from an electricity perspective) – will aid in preventing customers from being misled by receiving too many stars on screens using a large volume of energy.

2. Transparent Sourcing: All source documentation for graphic elements used within the storyboard frames will be directly referenced to allow for 100% data transparency and integrity.

3. Contextual Framing: Using a series (6 frames) of storyboards along with raw data will establish explanations as to why the data trends exist and will eliminate the confusion which has been created by solely providing raw numbers without context surrounding them. 

## AI Declaration

This assignment employed the collaborative use of AI tools.

Code Implementation - AI helped with the design of the CSS Grid for the bento box layout and the development of the full-screen modal zoom and carousel transitions.

Refinement - All AI-generated code and/or text were reviewed and edited after testing were conducted in the Mercury server to confirm alignment with Exercise 3 requirements.

## Website Storytelling

The project was redesigned as an interactive data-driven experience:

- Interactive Grid: A 3 column "Bento Box" grid that allows the audience to explore all 5 Data Stories at their own pace by using the "tiles".

- Zoom-In Architecture: This is initiated when a user clicks on a Data Card; this triggers a Zoom-In animation, removing background noise, allowing the user to focus on a specific storyboard modal.

- Guided Narrative: Each modal uses a carousel system to take the Viewer through a chronological series of 6 frames of evidence.

- Actionable Insights: All of the 5 Data Storylines end in data-backed recommendations taking them beyond traditional visualization to practical consumer advice.
