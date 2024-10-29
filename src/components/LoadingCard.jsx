import { Card, Placeholder } from "react-bootstrap";

export default function LoadingCard() {
    const cardStyle = {
        height: "300px",
    }

    return (
        <Card
            style={cardStyle}
            className="mb-2"
        >
            <Card.Body>
                <Placeholder as={Card.Title} animation="wave">
                    <Placeholder xs={8} />
                </Placeholder>
                <Placeholder className='mb-2' as={Card.Subtitle} animation="wave">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="wave">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
            </Card.Body>
        </Card>
    )
}