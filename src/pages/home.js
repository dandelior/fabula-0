import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { Helmet } from "react-helmet";

import Header from '../components/header';
import GridPosts from '../components/gridPosts';

import '../assets/sass/home.sass'

export default function Home() {
    const [allPostsData, setAllPosts] = useState(null);
    const [numberPosts, setNumberPosts] = useState(5);
    let [loadMoreMessage, msj] = useState('Cargar más');
    let [buttonDisabled, setButtonDisabled] = useState('active');

    useEffect(() => {
        const fetchData = async () => 
        {
          sanityClient
          .fetch(
            `*[_type == "letra"] | order(_createdAt desc) [0...${numberPosts}] {
            titulo,
            slug,
            'date' : _createdAt,
            imagen_destacada{
              asset->{
              _id,
              url
            }
          }
        }`
          )
          .then((data) => {
            setAllPosts(data);
            // console.log(data);
          })
          .catch(console.error);
        }

        fetchData();
    }, [numberPosts]);

    const loadMore = () => {
        // console.log(allPostsData.length);
        // console.log(numberPosts);
        if (allPostsData.length < numberPosts) {
          console.log('No hay mas posts');
          msj(loadMoreMessage = 'Has llegado al final');
          setButtonDisabled(buttonDisabled = 'disabled');
        } else {
          setNumberPosts(numberPosts + 5);
        }
    }

    // If not Loaded
    if (!allPostsData) return (
      <div className="box">
          <h1>
              FABULA
          </h1>
      </div>
    );

    return (
        <>
          <Helmet>
              <title>FABULA</title>
              <link rel="canonical" href={window.location.href} />
          </Helmet>
          <Header />
          <main className="home">
              <GridPosts posts={allPostsData} />
              <div className="nexts">
                <button className={`loadMoreButton ${buttonDisabled}`} onClick={loadMore}>
                  {loadMoreMessage}
                </button>
              </div>
          </main>
        </>
    )
}