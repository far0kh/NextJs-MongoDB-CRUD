import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ModeToggle } from '@/components/ModeToggle'

const Navbar = () => {
  return (
    <nav className="flex relative gap-2 p-8 ">
      <Link className={buttonVariants({ variant: "link" })} href={"/"}>
        Home page
      </Link>
      <Link
        className={buttonVariants({ variant: "link" })}
        href={"/create-user"}
      >
        Create User
      </Link>
      <ModeToggle />
    </nav>
  )
}

export default Navbar