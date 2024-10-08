import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Carousel,
  Card,
  Modal,
} from "react-bootstrap";
import { FaStar, FaRegStar, FaCheckCircle } from "react-icons/fa";
import { testimonials, productList } from "../data";
import styles from "../styles/Testimonials.module.css";

function Testimonials() {
  const [formData, setFormData] = useState({
    orderNumber: "",
    email: "",
    name: "",
    product: [],
    rating: 0,
    review: "",
  });

  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const MIN_REVIEW_LENGTH = 50;
  const MAX_REVIEW_LENGTH = 250;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      const newProducts = checked
        ? [...prevFormData.product, value]
        : prevFormData.product.filter((product) => product !== value);
      return { ...prevFormData, product: newProducts };
    });
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false || formData.product.length === 0) {
      setValidated(true);
      return;
    }

    const data = {
      "form-name": "testimonial", // match the hidden form name
      ...formData,
    };

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(data),
    })
      .then(() => {
        // Clear the form
        setFormData({
          orderNumber: "",
          email: "",
          name: "",
          product: [],
          rating: 0,
          review: "",
        });
        setValidated(false);

        // Show the modal
        setShowModal(true);
      })
      .catch((error) => {
        alert("An error occurred. Please try again later.");
        console.error(error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} color="#ffba25" />);
      } else {
        stars.push(<FaRegStar key={i} color="#ffba25" />);
      }
    }
    return stars;
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-2">Testimonials</h2>

      {/* Testimonials Carousel */}
      <Carousel variant="dark">
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index}>
            <Card
              className={`${styles.TestimonialCard} text-center border-0 mx-0 mx-sm-3 mx-md-5`}
            >
              <Card.Body className={styles.TestimonialBody}>
                {testimonial.verified && (
                  <FaCheckCircle
                    color="green"
                    title="Verified Purchase"
                    className="mb-2"
                    size={20}
                  />
                )}
                <Card.Title>
                  {testimonial.name ? testimonial.name : "Anonymous"}
                </Card.Title>
                <Card.Text className={`${styles.Product} text-center`}>
                  {testimonial.product.map((product, index) => (
                    <span key={index}>
                      {product}
                      {index < testimonial.product.length - 1 && ", "}
                    </span>
                  ))}
                </Card.Text>

                <Card.Text className="text-center">
                  {renderStars(testimonial.rating)}
                </Card.Text>
                <Card.Text className={styles.ReviewText}>
                  "{testimonial.review}"
                </Card.Text>
                {testimonial.timestamp && (
                  <Card.Text className="text-muted">
                    {new Date(testimonial.timestamp).toLocaleDateString()}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>

      <hr className="my-5" />

      {/* Testimonials Submission Form */}
      <Row className="px-2">
        <Col md={6} className="mx-auto">
          <h4 className="text-center mb-3">Submit Your Review</h4>
          <Form
            name="testimonial"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            {/* Netlify Forms Hidden Inputs */}
            <input type="hidden" name="form-name" value="testimonial" />
            <input type="hidden" name="bot-field" />

            <Form.Group controlId="formOrderNumber" className="mb-3">
              {/* <Form.Label>Order Number (or gift code)</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Enter your order number"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide your order number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formName" className="mb-3">
              {/* <Form.Label>Name (optional)</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="given-name"
              />
            </Form.Group>

            <Form.Group controlId="formProducts" className="mb-3">
              <Form.Label className={styles.FormLabel}>
                Which product are you reviewing?
              </Form.Label>
              <div className={styles.ProductList}>
                {productList.map((product, index) => (
                  <Form.Check
                    type="checkbox"
                    key={index}
                    id={`product-${index}`}
                    label={product.title}
                    value={product.title}
                    checked={formData.product.includes(product.title)}
                    onChange={handleCheckboxChange}
                    required={formData.product.length === 0}
                  />
                ))}
              </div>
              <Form.Control.Feedback type="invalid">
                Please choose at least one product.
              </Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              >
                <option value="">Select a rating</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Stars
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a rating.
              </Form.Control.Feedback>
            </Form.Group> */}

            <Form.Group className="mb-3">
              <fieldset>
                <Form.Label className={styles.FormLabel} as="legend">
                  {/* Rating */}
                </Form.Label>
                <div className="d-flex align-items-center justify-content-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <React.Fragment key={star}>
                      <input
                        required
                        type="radio"
                        id={`star${star}`}
                        name="rating"
                        value={star}
                        checked={formData.rating === star}
                        onChange={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor={`star${star}`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <FaStar
                          size={30}
                          style={{ cursor: "pointer" }}
                          color={
                            (hoverRating || formData.rating) >= star
                              ? "#ffba25"
                              : "#fff9ee"
                          }
                        />
                      </label>
                    </React.Fragment>
                  ))}
                </div>
                {validated && !formData.rating && (
                  <div className="text-danger mt-2">
                    Please select a rating.
                  </div>
                )}
              </fieldset>
            </Form.Group>

            <Form.Group controlId="formReview" className="mb-3">
              {/* <Form.Label>Review</Form.Label> */}
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Write your review here."
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
                minLength={MIN_REVIEW_LENGTH}
                maxLength={MAX_REVIEW_LENGTH}
              />
              <Form.Control.Feedback type="invalid">
                Please write a review between {MIN_REVIEW_LENGTH} and{" "}
                {MAX_REVIEW_LENGTH} characters.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                {formData.review.length}/{MAX_REVIEW_LENGTH} characters
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className={`${styles.SubmitButton} border-0`}
              >
                Submit
              </button>
            </div>
          </Form>
        </Col>
      </Row>

      {/* Submission Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thank You!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your review has been submitted and is being looked at by human eyes
            before being posted!
          </p>
          <p>We appreciate your feedback!</p>
        </Modal.Body>
        <Modal.Footer>
          <button className={styles.CloseButton} onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Testimonials;
