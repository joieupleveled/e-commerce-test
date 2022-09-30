import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { animals } from '../../database/animals';

const animalStyles = css`
  border-radius: 20%;
  border: 1px solid #ccc;
  padding: 20px;

  h2 {
    margin-top: 0;
  }

  & + & {
    margin-top: 25px;
  }
`;

export default function Animal(props) {
  // Early return pattern
  if (props.error) {
    return (
      <div>
        <Head>
          <title>Animal not found</title>
          <meta name="description" content="Animal not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/animals">Animals page</Link>
      </div>
    );
  }

  // Whatever we type on browser link after the world 'animals', it will automatically render this product page
  return (
    <div css={animalStyles}>
      <Head>
        <title>
          {props.animal.name}, the {props.animal.type}
        </title>
        <meta
          name="description"
          content={`${props.animal.name} is a ${props.animal.type} with a ${props.animal.accessory}`}
        />
      </Head>
      <h2>{props.animal.name}</h2>
      <Image
        src={`/${props.animal.id}-${props.animal.name.toLowerCase()}.jpeg`}
        alt=""
        width="150"
        height="200"
      />
      {/* <div>Id: {animal.id}</div> */}
      <div>Type: {props.animal.type}</div>
      <div>Accessory: {props.animal.accessory}</div>
    </div>
  );
}

export function getServerSideProps(context) {
  // console.log(context.query);

  // fyi: the const animalId  below simulates doing to 1 single user but everytime you go to 1, you go through the whole list, EVERYTIME! Is there a more efficient way? Yes! Another lecture
  // Note: this is not the most efficient way of finding the single animal, because it will run every time. Using a databse like PostgreSQL will allow you to do this in a nicer way.

  // Retrieve the animal ID from the URL
  const animalId = parseInt(context.query.animalId);

  // Finding the animal
  const foundAnimal = animals.find((animal) => {
    return animal.id === animalId;
  });
  if (typeof foundAnimal === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Animal not found',
      },
    };
  }
  return {
    props: {
      animal: foundAnimal,
    },
  };
}
