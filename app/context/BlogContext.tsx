"use client";
import React, {
	createContext,
	useContext,
	useCallback,
	useState,
	useEffect,
} from "react";
import Banner from "@/feature/core/banner/domain/entity/banner.entity";
import fetchBlogBannersUsecase from "@/feature/core/banner/domain/usecase/fetch-blog-banners.usecase";
import { pipe } from "fp-ts/lib/function";
import { fold } from "fp-ts/lib/Either";

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
	blogBanner: Banner | null;
	blogBannerLoading: boolean;
	blogBannerError: string | null;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [blogsLoading, setBlogsLoading] = useState(true);
	const [blogsError, setBlogsError] = useState<string | null>(null);

	const [blogBanner, setBlogBanner] = useState<Banner | null>(null);
	const [blogBannerLoading, setBlogBannerLoading] = useState(true);
	const [blogBannerError, setBlogBannerError] = useState<string | null>(null);

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

	const loadBanner = useCallback(async () => {
		setBlogBannerLoading(true);
		setBlogBanner(null);
		setBlogBannerError(null);

		const result = await fetchBlogBannersUsecase()();

		pipe(
			result,
			fold(
				(error) => {
					setBlogBannerError(error.message);
					setBlogBannerLoading(false);
				},
				(banners) => {
					setBlogBanner(banners.length > 0 ? banners[0] : null);
					setBlogBannerLoading(false);
				},
			),
		);
	}, []);

	useEffect(() => {
		loadBlogs();
		loadBanner();
	}, [loadBanner]);

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
				blogBanner,
				blogBannerLoading,
				blogBannerError,
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
