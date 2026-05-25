"use client";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
} from "react";

interface Blog {
	id: number;
	title_ind: string;
	title_eng: string;
	description_ind: string;
	description_eng: string;
	thumbnail: string;
	slug: string;
	created_at: string;
	updated_at: string;
}

interface BlogContextType {
	blogs: Blog[];
	blogsLoading: boolean;
	blogsError: string | null;
	refreshBlogs: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [blogsLoading, setBlogsLoading] = useState(true);
	const [blogsError, setBlogsError] = useState<string | null>(null);

	const loadBlogs = async () => {
		setBlogsLoading(true);
		setBlogsError(null);

		try {
			const response = await fetch('/api/public/blogs');
			const result = await response.json();

			if (result.success) {
				setBlogs(result.data);
			} else {
				setBlogsError(result.message || 'Failed to fetch blogs');
			}
		} catch (error) {
			console.error('Error fetching blogs:', error);
			setBlogsError('Failed to fetch blogs');
		} finally {
			setBlogsLoading(false);
		}
	};

	useEffect(() => {
		loadBlogs();
	}, []);

	const refreshBlogs = () => {
		loadBlogs();
	};

	return (
		<BlogContext.Provider
			value={{
				blogs,
				blogsLoading,
				blogsError,
				refreshBlogs,
			}}
		>
			{children}
		</BlogContext.Provider>
	);
}

export function useBlogContext() {
	const context = useContext(BlogContext);
	if (context === undefined) {
		throw new Error("useBlogContext must be used within a BlogProvider");
	}
	return context;
}
