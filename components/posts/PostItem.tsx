import { useRouter } from 'next/router'; // For routing between pages
import { useCallback, useMemo } from 'react'; // React hooks for performance optimization and memoization
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'; // Icons for likes and comments
import { formatDistanceToNowStrict } from 'date-fns'; // To format the time since the post was created

import useLoginModal from '@/hooks/useLoginModal'; // Custom hook to manage login modal state
import useCurrentUser from '@/hooks/useCurrentUser'; // Custom hook to get the current user data
import useLike from '@/hooks/useLike'; // Custom hook to manage like functionality
import SeeMoreLess from '@/components/SeeMoreLess'; // Custom component to toggle between more and less content




import Avatar from '../Avatar'; // Avatar component for displaying user profile pictures

// Define the interface for the props
interface PostItemProps {
  data: Record<string, any>; // Data for the post
  userId?: string; // Optional user ID
}

// Functional component PostItem definition
const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter(); // Router for navigating between pages
  const loginModal = useLoginModal(); // Instance of the login modal hook

  const { data: currentUser } = useCurrentUser(); // Get the current user's data
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId }); // Manage like state for the post

  // Navigate to the user profile page when the user name is clicked
  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation(); // Prevent click event from bubbling up
    router.push(`/users/${data.user.id}`); // Navigate to the user's profile
  }, [router, data.user.id]);

  // Navigate to the post detail page when the post is clicked
  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`); // Navigate to the post's detail page
  }, [router, data.id]);

  // Handle the like functionality
  const onLike = useCallback(async (ev: any) => {
    ev.stopPropagation(); // Prevent click event from bubbling up

    if (!currentUser) { // If there is no logged-in user
      return loginModal.onOpen(); // Open the login modal
    }

    toggleLike(); // Toggle the like state
  }, [loginModal, currentUser, toggleLike]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart; // Determine which like icon to show

  // Calculate the time since the post was created
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null; // Return null if createdAt is not available
    }

    return formatDistanceToNowStrict(new Date(data.createdAt)); // Format the creation date
  }, [data.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="border-b border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition duration-200"
    >
      <div className="flex flex-col md:flex-row items-start gap-4">
        <Avatar userId={data.user.id} />

        <div className="flex-1">
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline text-base md:text-lg"
            >
              {data.user.name}
            </p>

            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block lg:text-sm"
            >
              @{data.user.username}
            </span>
          </div>

          <span className="text-neutral-500 text-xs md:text-sm mt-0">
            {createdAt}
          </span>

          <div className="text-white mt-1 text-sm md:text-base">

            <SeeMoreLess text={data.body} maxLength={200} />
          </div>

          <div className="flex flex-row items-center mt-4 gap-8">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p className="text-sm">{data.comments?.length || 0}</p>
            </div>

            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
              <p className="text-sm">{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

// Exporting PostItem component as default
export default PostItem;
