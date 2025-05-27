import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import React from 'react'
import StartupCard, { StartupTypeCard } from './StartupCard';

interface UserStartups {
  userId: string;
}

const UserStartups = async ({userId}: UserStartups) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id: userId});

  return (
    <>
    {startups.length > 0 ? (startups.map((startup: StartupTypeCard) => {
      return <StartupCard post={startup} key={startup._id}/>
    })) : (
      <p className='no-result'>No startups</p>
    )}
    </>
  )
}

export default UserStartups;