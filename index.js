let inputElement = document.getElementById("searchInput");
let searchResultsContainer = document.getElementById("searchResults");
let spinnerElement = document.getElementById("spinner")

let options = {
    method: "GET"
}

function createAndAppendResult(resultsArray) {
    spinnerElement.classList.toggle("d-none")
    searchResultsContainer.textContent = "";
    for (let object of resultsArray) {
        //creating list container element
        let listContainer = document.createElement("div");
        searchResultsContainer.appendChild(listContainer);

        //creating heading element
        let headingElement = document.createElement("a");
        headingElement.textContent = object.title;
        headingElement.classList.add("headingSection");
        headingElement.href = object.link;
        headingElement.target = "_blank";
        listContainer.appendChild(headingElement);

        //create newline
        let newlineElement = document.createElement("br");
        listContainer.appendChild(newlineElement)

        //creating linkElement
        let linkElement = document.createElement("a");
        linkElement.textContent = object.link;
        linkElement.classList.add("linkSection");
        listContainer.appendChild(linkElement);
        linkElement.href = object.link;
        linkElement.target = "_blank";


        //creating description
        let paragraphElement = document.createElement("p");
        paragraphElement.textContent = object.description;
        paragraphElement.classList.add("descriptionSection")
        listContainer.appendChild(paragraphElement);
    }

}

inputElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let inputWord = inputElement.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputWord;
        let options = {
            method: "GET"
        }
        spinnerElement.classList.toggle("d-none")
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsondata) {
                createAndAppendResult(jsondata.search_results)
            })
    }
})