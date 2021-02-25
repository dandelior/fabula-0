import React from "react";
import moment from 'moment';
import sanityClient from "../client.js";
import imageUrlBuilder from '@sanity/image-url'

import { Link } from "react-router-dom";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source)
}


const GridPosts = ({ posts }) => {
    return (
        <div className="items">
            {posts &&
            posts.map((post, index) => (
                <Link to={"/" + post.slug.current} className="item" key={post.slug.current}>
                    <div className="img-wrapper">
                        <div className="img" style={{ backgroundImage: `url(${urlFor(post.imagen_destacada).auto('format').width(1000).url()})` }}></div>
                    </div>
                    <div className="data">
                        <h3>{post.titulo}</h3>
                        <p>{moment(post.date).format('DD/MM/YYYY')}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};
export default GridPosts;