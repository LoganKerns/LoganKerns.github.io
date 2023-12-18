// Set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 35, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the svg object to the body of the page
var svg = d3
    .select("#scatterplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Create tooltip div
var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Read the data
d3.csv(
    "https://raw.githubusercontent.com/LoganKerns/Data-Science-1/main/CodeTemplates/JS/worldcities.csv",
    function (data) {
        // Add X axis
        var x = d3
            .scaleLinear()
            .domain([-60, 60])
            .range([0, width]);
        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(10))
            .selectAll("text")
            .style("fill", "white"); // Set X axis text color to white

        // Add Y axis
        var y = d3
            .scaleLinear()
            .domain([0, 10000])
            .range([height, 0]);
        svg
            .append("g")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("fill", "white"); // Set Y axis text color to white

        // Set the color of the axis path (main axis line) and tick marks to white
        svg.selectAll(".axis line, .axis path").style("stroke", "white");

        // Add X axis label
        svg
            .append("text")
            .attr(
                "transform",
                "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
            )
            .style("text-anchor", "middle")
            .style("fill", "white") // Set X axis label color to white
            .text("Latitude (Degrees)");

        // Add Y axis label
        svg
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - height / 2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("fill", "white") // Set Y axis label color to white
            .text("Elevation (Feet)");

        // Add dots
        svg
            .append("g")
            .selectAll("dot")
            .data(data.filter(function (d, i) {
                return i < 101;
            }))
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return x(parseFloat(d.lat));
            })
            .attr("cy", function (d) {
                return y(parseFloat(d.elevation));
            })
            .attr("r", 3)
            .style("fill", "rgb(45, 165, 195)")
            .on("mouseover", function (event, d) {
                tooltip.transition().duration(200).style("opacity", 0.9);
                tooltip.html("City: " + d.city_ascii + "<br/>Latitude: " + d.lat + "<br/>Elevation: " + d.elevation)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition().duration(500).style("opacity", 0);
            });
    }
);

// Function to show date and time
function showDateTime() {
    setInterval(function() {
        var currentDateTime = new Date().toLocaleString();
        document.getElementById('datetime').innerHTML = currentDateTime;
    }, 1000);
}

// Fade-in effect function
function fadeIn(element, duration) {
    var opacity = 0;
    var interval = 50; // Time in milliseconds between opacity increases
    var increment = interval / duration; // Calculate the increment

    var fading = setInterval(function() {
        opacity += increment;
        if (opacity >= 1) {
            opacity = 1;
            clearInterval(fading);
        }
        element.style.opacity = opacity;
    }, interval);
}

// Call the fade-in function and the date-time function when the window loads
window.onload = function() {
    fadeIn(document.body, 2000); // Fade in the body over 2000 milliseconds (2 seconds)
    showDateTime();
};
