type NavLink = {
  icon: React.ReactElement;
  href?: string;
  title: string;
  sublinks?: Sublink[];
};

type Sublink = {
  icon: React.ReactElement;
  name: string;
  href?: string;
  subItems?: Sublink[];
};
