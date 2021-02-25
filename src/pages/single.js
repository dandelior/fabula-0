import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { Helmet } from "react-helmet";
import imageUrlBuilder from "@sanity/image-url";

import Header from '../components/header';

import { Link } from "react-router-dom";

import '../assets/sass/single.sass'

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Single() {
    const [postData, setPostData] = useState(null);
    const { slug } = useParams();

    // Fetch slug
    useEffect(() => {
        sanityClient
          .fetch(
            `*[slug.current == $slug]{
              titulo,
              slug,
              _id, 
              imagen_destacada{
                asset->{
                  _id,
                  url
                 }
               },
             contenido,
             'nextPost': *[_type == 'letra' && _createdAt < ^._createdAt] | order(_createdAt desc)[0] {
                    titulo,
                    slug
                }
           }`,
            { slug }
          )
          .then((data) => {
              setPostData(data[0]);
        })
          .catch(console.error);
    }, [slug]);

    // If not Loaded
    if (!postData) return (
        <div className="box">
            <h1>
                FABULA
            </h1>
        </div>
    );

    return (
        <>
            <Helmet>
                <title>{postData.titulo} — FABULA</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <Header active="isSingle" />
            <main className="single">
                <div className="single-wrapper">
                    <div className="img-wrapper">
                        <div className="img" style={{backgroundImage: `url(${urlFor(postData.imagen_destacada).auto('format').width(1000).url()})`}}></div>
                    </div>
                    <div className="data-wrapping">
                        <div className="data">
                            <h1>{postData.titulo}</h1>
                            <BlockContent blocks={postData.contenido} />
                        </div>
                        <div className="next-wrapper">
                            {postData.nextPost 
                                && (
                                    <Link to={`/${postData.nextPost.slug.current}`} className="next">
                                        <p>Siguiente -></p>
                                        <p className="title">
                                            {postData.nextPost.titulo}
                                        </p>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}