// @see: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments
const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <p className={'text-[300px] text-red-500'}>onPage</p>My movie: {params.id}
    </div>
  )
}

export default Page
