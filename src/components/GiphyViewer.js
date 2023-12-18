import axios from "axios";
import { useState, useEffect } from "react";
import { CardBody } from "react-bootstrap";
import { Card, Row, Button, Dropdown, DropdownButton } from "react-bootstrap";

const GIPHY_URL = "https://api.giphy.com/v1/gifs";
const API_KEY = "ld7uR2ZapD9Ae4pzCZFJrBRyF1FMAeRW";

const GiphyViewer = () => {
  const [gifs, setGifs] = useState([]);
  const [term, setTerm] = useState("");
  const [limit, setLimit] = useState([]);

  useEffect(() => {
    getTrending();
  }, []);

  const handleTrendingClick = () => {
    getTrending();
  };

  const getTrending = () => {
    axios
      .get(`${GIPHY_URL}/trending?api_key=${API_KEY}&q=${term}&limit=${limit}`)
      .then((response) => {
        console.log(response.data.data);
        setGifs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRandomClick = () => {
    getRandom();
  };

  const getRandom = () => {
    axios
      .get(`${GIPHY_URL}/random?api_key=${API_KEY}&q=${term}`)
      .then((response) => {
        console.log(response.data.data);
        setGifs([response.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleClick = () => {
    searchGIF();
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      searchGIF();
    }
  };

  const searchGIF = () => {
    if (!term) {
      alert("Please enter a search term!");
      return;
    }

    // console.log(`Search for: ${searchTerm}`);
    axios
      .get(`${GIPHY_URL}/search?api_key=${API_KEY}&q=${term}&limit=${limit}`)
      .then((response) => {
        console.log(response.data.data);
        setGifs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setTerm("");
  };

  const handleSelect = (amount) => {
    console.log(amount);
    setLimit(amount);
  };

  const gifComponents = gifs.map((g) => {
    return (
      <GIFCard
        key={g.id}
        title={g.title}
        url={g.url}
        image={g.images.fixed_width.url}
      />
    );
  });

  return (
    <>
      <div className="search">
        <input
          type="text"
          value={term}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <Button variant="primary" onClick={handleClick}>
          Search
        </Button>

        <Button variant="primary" onClick={handleTrendingClick}>
          Trending
        </Button>

        <Button variant="primary" onClick={handleRandomClick}>
          Random!
        </Button>

        <DropdownButton onSelect={handleSelect} size="sm" id="dropdown-basic-button" title="Limit" variant="secondary">
            <Dropdown.Item eventKey={15}>15</Dropdown.Item>
            <Dropdown.Item eventKey={20}>20</Dropdown.Item>
            <Dropdown.Item eventKey={25}>25</Dropdown.Item>
            <Dropdown.Item eventKey={50}>50</Dropdown.Item>
        </DropdownButton>

      </div>

      <Row className="g-4" md={3} xs={1}>
        {gifComponents}
      </Row>
    </>
  );
};

const GIFCard = (props) => {
  return (
    <Card>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>
          <a href={props.url} target="_blank">
            {props.title}
          </a>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default GiphyViewer;
