import Image from 'next/image'

export function ImagemLateral() {
  return (
    <div className="md:w-1/2 h-[250px] md:h-auto relative">
      <Image
        src="/home/banner1.jpg"
        alt="Imagem de coleta"
        fill
        className="object-cover"
      />
    </div>
  )
}
