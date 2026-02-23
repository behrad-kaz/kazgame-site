import Article from "@/components/Article";
import Container from "@/components/Container";
import Link from "next/link";
import React from "react";


 export interface IGetArtcles {
    id ? : string ,
     title : string ,
     description : string

}

async function Blogs() {
    const result = await fetch("http://localhost:3001/articles")

    const data = await result.json() as IGetArtcles[] ;

  return (
    <Container>
      <div className="grid grid-cols-4 gap-4 py-16">
        {
            data.map(item => (
                <Link key={item.id} href={`/blogs/${item.id}`}>
                 <Article  {...item} />
                 </Link>
            ))
        }
       
      </div>
    </Container>
  );
}

export default Blogs;
