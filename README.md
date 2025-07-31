# 🚗 InsuraX Car Insurance App

This is a web application that allows users to manage their vehicles and request insurance quotes. Users can view quotes per vehicle and select one as their active insurance. The selected quote is then displayed on the vehicle's card in the dashboard.

## 🔧 Features

- Add, edit, and delete vehicles
- Generate and view insurance quotes per vehicle
- Select a preferred quote for each vehicle
- Change Quote
- Display selected quote label directly on the vehicle card
- Filter by year
- Search option
- Light/Dark Mode
- 404 Page not found if incorrect route is typed

## 🧠 How It Works

### 1. Add a Vehicle

Users fill in a form with details like make, model, and year. Once submitted, the vehicle appears in the dashboard list.

### 2. Get Quotes

Each vehicle has a "Get Quote" button that navigates to a quote selection page. The app displays 3 insurance options for that specific vehicle.

### 3. Select a Quote

The user selects one quote, which gets saved as the chosen quote for that vehicle. This selection will show on the dashboard.

### 4. View Dashboard

In the dashboard, each vehicle is displayed as a card. If a vehicle has a selected quote, it will show a label like:

`✅ Insured with (company) for R450 /pm`

If no quote is selected, the label will show `No active insurance`.

## 🛠 Tech Stack

- **React** – Frontend library
- **Material UI** – Styling and UI components
- **React Router** – Navigation between pages
- **CSS**- Bit of Styling
- **MockAPI** - 3 resources for selectedquotes, vehicles, and 3 insurance companies (all data is stored here)
- **Unsplash** - API to get image of the car by make and model(if not found,looks for the closest image to it)
