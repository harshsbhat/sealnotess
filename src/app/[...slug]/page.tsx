import { redis } from "@/lib/redis";
import { DecryptSite } from "@/components/controlModals/decrypt-old-site";
import { CreateNewSite } from "@/components/controlModals/create-new-site";

interface NotepadPageProps {
  params: {
    slug: string[];
  };
}


export const fetchData = async(mergedSlug: string, siteExists: number) => {
  const data = siteExists ? await redis.get(mergedSlug) : null;   
  return data;
}

export default async function NotepadPage({ params }: NotepadPageProps) {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const { slug } = await params;
  const mergedSlug = slug.join("/");

  const siteExists = await redis.exists(mergedSlug);
  const data = await fetchData(mergedSlug, siteExists)


  return (
    <div>
      {siteExists ? (
        <DecryptSite params={mergedSlug} encryptedData={data as string}/>
      ) : (
        <CreateNewSite params={mergedSlug}/>
      )}
    </div>
  );
}