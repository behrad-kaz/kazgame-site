import Container from '@/components/Container'
import React from 'react'
import { IGetArtcles } from '../page';


interface IArticleProps {
    params : Promise<{id : string}> ,
    SearchParams: {}
}

async function Article(props :IArticleProps) {

    const { id } = await props.params;

    const result = await fetch(`http://localhost:3001/articles/${id}`)

    const data = (await result.json()) as IGetArtcles ;


  return (
    <Container>
        <div>
            <h2 className='text-lg font-bold my-4'>{data.title}</h2>
            <p>{data?.description}</p>
        </div>



    </Container>


  )
}

export default Article