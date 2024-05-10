$(document).ready(function () {
    // Variable to store all college data
    let allCollegeData = [];

    // Fetch college data from JSON file
    async function fetchCollegeData() {
        try {
            const response = await fetch('static/college.json');
            allCollegeData = await response.json();
            // Show only the first 10 colleges initially
            setData(allCollegeData.slice(0, 10));
        } catch (error) {
            console.error('Error fetching college data:', error);
        }
    }

    // Display college data in the table
    function setData(collegeData) {
        const tableBody = $('#collegeTable tbody');
        tableBody.empty();
        collegeData.forEach(function (college) {
            var websiteLink = '<a href="' + college.web_pages[0] + '" target="_blank" rel="noreferrer">' + college.web_pages[0] + '</a>';
            var row = '<tr><td>' + college.name + '</td><td>' + websiteLink + '</td><td>' /*+ college.domains + '</td><td>'*/ + college.country + '</td></tr>';
            tableBody.append(row);
        });
    }

    // Handle search button click
    $('#submitBtn').on('click', function () {
        const searchText = $('#searchInput').val().trim().toLowerCase();
        // Filter colleges based on search text
        const filteredColleges = allCollegeData.filter(college => college.name.toLowerCase().includes(searchText) || college.country.toLowerCase().includes(searchText));
        // Show filtered colleges
        setData(filteredColleges);
    });

    // Handle enter key press in search input
    $('#searchInput').on('keydown', function (event) {
        if (event.key === 'Enter') {
            $('#submitBtn').click();
        }
    });

    // Initial fetch when document is ready
    fetchCollegeData();
});
