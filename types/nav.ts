type NavLink = {
  icon: JSX.Element;
  href?: string;
  title: string;
  sublinks?: Sublink[];
};

type Sublink = {
  icon: JSX.Element;
  name: string;
  href: string;
};
