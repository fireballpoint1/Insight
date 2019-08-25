# Insight: Telemetry Tracking Made Easy

**Insight** predicts app telemetry given past history of the same, and uses these predictions to keep the app developers notified of changes in usage events.

## Requirements

To run the demo, the requirements only **Jupyter** is required.

To run the entire system from end to end, the following python dependencies are required;
- Jupyter
- Python3
- Pandas
- Facebook Prophet
- PyStan
- Plotly

## Demo

In our demo, we train our model on the event counts of the even named _fL_ and make forecasts for 2000 hours into the future, beyond the given dataset. We then start a server which now serves the predictions as well as live telemtry from an app onto the internet and visualize it on the client side.

To demo the app, perform the following steps in order;
1. Start a Jupyter notebook server 
2. Launch the `code/Web Architecture.ipynb` notebook
3. Run all cells in order

## Credits

Created by team _**Do-Little**_ for ***Howzhack '19*.
