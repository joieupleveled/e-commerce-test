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

export default function Animals(props) {
  console.log('props in the browser', props);
  return (
    <>
      <Head>
        <title>All of the animals</title>
        <meta name="description" content="List page of all animals" />
      </Head>
      <h1>Animals</h1>

      {props.animals.map((animal) => {
        // {[].map((animal) => {
        return (
          <div key={`animal-${animal.id}`} css={animalStyles}>
            <h2>
              <Link href={`/animals/${animal.id}`}>{animal.name}</Link>
            </h2>

            <Link href={`/animals/${animal.id}`}>
              <a>
                <Image
                  src={`/${animal.id}-${animal.name.toLowerCase()}.jpeg`}
                  alt=""
                  width="150"
                  height="200"
                />
              </a>
            </Link>

            {/* <div>Id: {animal.id}</div> */}
            <div>Type: {animal.type}</div>
            <div>Accessory: {animal.accessory}</div>
            {/* <div>
              Image Name: {animal.id}-{animal.name.toLowerCase()}.jpeg
            </div> */}
          </div>
        );
      })}
    </>
  );
}
// Anything inside of this function will
// ONLY be run on the server (in Node.js)
//
// This means you can access thins like `fs``

export function getServerSideProps() {
  // console.log('animals', animals);
  return {
    // Retrieve me the information from the server side((Node)and pass it to the componenent)
    // By adding the "props" parameter on "Animals(props)" line 20 (1:07) to connect the BE to FE
    // Anything that you write in this props object will become the props that are passed to the page component anove
    // Then display me the animals in the browser! Whatever was declared below will be pass on to the function in line 20

    // Do not use with other files because getServerSideProps only works from files within pages
    props: {
      // 1st prop, contaiing all animals
      animals: animals,
      // 2nd prop, just an example
      abc: 123,
    },
  };
}
